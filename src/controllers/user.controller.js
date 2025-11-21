import UserService from "../services/user.service.js";
import PasswordResetService from "../services/passwordReset.service.js";
import UserDTO from "../dto/user.dto.js";
import {
  createHash,
  isValidatePassword,
  generateToken,
  hashToken,
} from "../utils/index.js";

const userService = new UserService();
const passwordResetService = new PasswordResetService();

class UserController {
  static register = async (req, res) => {
    try {
      const created = req.user;
      res.status(201).json({
        message: "Usuario creado correctamente",
        payload: new UserDTO(created),
      });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error en el servidor", err: err.message });
    }
  };

  static login = async (req, res) => {
    try {
      const user = req.user;
      const payload = { id: user._id, email: user.email, role: user.role };
      const token = generateToken(payload, "1h");
      res.cookie("authCookie", token, { httpOnly: true, maxAge: 300000 });
      res.json({ message: "Inicio aceptado", user: new UserDTO(user) });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error en el servidor", err: err.message });
    }
  };

  static current = async (req, res) => {
    const user = req.user;
    res.json(new UserDTO(user));
  };

  static checkEmail = async (req, res) => {
    try {
      const { email } = req.query;
      const exists = await userService.getUserByEmail(email);
      if (exists) return res.json({ exists: true });
      res.json({
        exists: false,
        message: "los datos ingresados no son correstos",
      });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error en el servidor", err: err.message });
    }
  };

  static logout = (req, res) => {
    res.clearCookie("authCookie");
    res.json({ message: "Logout ok" });
  };

  static updatePassword = async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password)
        return res.status(400).json({ message: "Faltan datos" });

      const user = await userService.getUserByEmail(email);
      if (!user)
        return res.status(404).json({ message: "Usuario no encontrado" });

      if (isValidatePassword(password, user.password)) {
        return res.status(400).json({
          message: "La nueva contraseña no puede ser la misma que la anterior",
        });
      }
      const newHash = createHash(password);
      await userService.addToPasswordHistory(user._id, user.password);
      await userService.updateUser(user._id, { password: newHash });

      res.json({ message: "Contraseña actualizada" });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error en el servidor", err: err.message });
    }
  };

  static sendRecoveryMail = async (req, res) => {
    try {
      const { email } = req.body;
      if (!email) return res.status(400).json({ message: "Email requerido" });

      const user = await userService.getUserByEmail(email);
      if (!user) {
        return res.json({ message: "Si existe la cuenta, se envió un correo" });
      }
      const { tokenPlain, record } =
        await passwordResetService.createTokenForUser(user._id);
      await userService.sendRecoveryEmail(email, tokenPlain, user._id);

      res.json({ message: "Si existe la cuenta, se envió un correo" });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error en el servidor", err: err.message });
    }
  };

  static resetPassword = async (req, res) => {
    try {
      const { userId, token, newPassword } = req.body;
      if (!userId || !token || !newPassword)
        return res.status(400).json({ message: "Faltan datos" });

      const record = await passwordResetService.validateToken(userId, token);
      if (!record)
        return res.status(400).json({ message: "Token inválido o expirado" });
      if (!mongoose.isValidObjectId(req.params.pid))
        return res.status(400).json({ message: "ID del usuario invalido" });
      const user = await userService.getUserById(userId);
      if (!user)
        return res.status(404).json({ message: "Usuario no encontrado" });

      if (isValidatePassword(newPassword, user.password)) {
        return res.status(400).json({
          message: "La nueva contraseña no puede ser igual a la anterior",
        });
      }

      const newHash = createHash(newPassword);
      await userService.addToPasswordHistory(user._id, user.password);
      await userService.updateUser(user._id, { password: newHash });

      await passwordResetService.markUsed(record._id);

      res.json({ message: "Contraseña restablecida" });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error en el servidor", err: err.message });
    }
  };
  static viewMessage = (req, res) => {
    const { userId, token } = req.query;

    if (!userId || !token) {
      return res.status(400).json({
        status: "error",
        message:
          "Faltan parámetros en la URL. Este endpoint solo muestra instrucciones.",
      });
    }

    res.json({
      status: "ok",
      info: "Este enlace contiene el token de recuperación enviado por correo.",
      instrucciones:
        "Para restablecer la contraseña, hacé un POST a /api/users/reset con el siguiente cuerpo JSON:",
      ejemplo_body: {
        userId,
        token,
        newPassword: "nuevaContraseña123",
      },
      aviso: "El token tiene una validez de 1 hora.",
    });
  };
}
export default UserController;
