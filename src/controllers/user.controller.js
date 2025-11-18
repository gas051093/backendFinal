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
    // req.user comes from passport register strategy
    const created = req.user;
    res
      .status(201)
      .json({
        message: "Usuario creado correctamente",
        payload: new UserDTO(created),
      });
  };

  static login = async (req, res) => {
    const user = req.user;
    const payload = { id: user._id, email: user.email, role: user.role };
    const token = generateToken(payload, "1h");
    res.cookie("authCookie", token, { httpOnly: true, maxAge: 60 * 60 * 1000 });
    res.json({ message: "Inicio aceptado", user: new UserDTO(user) });
  };

  static current = async (req, res) => {
    // passport jwt provided user in req.user
    const user = req.user;
    res.json(new UserDTO(user));
  };

  static checkEmail = async (req, res) => {
    const { email } = req.query;
    const exists = await userService.getUserByEmail(email);
    res.json({ exists: !!exists });
  };

  static logout = (req, res) => {
    res.clearCookie("authCookie");
    res.json({ message: "Logout ok" });
  };

  static updatePassword = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Faltan datos" });

    const user = await userService.getUserByEmail(email);
    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });

    if (isValidatePassword(password, user.password)) {
      return res
        .status(400)
        .json({
          message: "La nueva contraseña no puede ser la misma que la anterior",
        });
    }

    const newHash = createHash(password);
    await userService.addToPasswordHistory(user._id, user.password);
    await userService.updateUser(user._id, { password: newHash });

    res.json({ message: "Contraseña actualizada" });
  };

  static sendRecoveryMail = async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email requerido" });

    const user = await userService.getUserByEmail(email);
    if (!user) {
      // do not reveal existence
      return res.json({ message: "Si existe la cuenta, se envió un correo" });
    }

    const { tokenPlain, record } =
      await passwordResetService.createTokenForUser(user._id);
    await userService.sendRecoveryEmail(email, tokenPlain, user._id);

    res.json({ message: "Si existe la cuenta, se envió un correo" });
  };

  static resetPassword = async (req, res) => {
    const { userId, token, newPassword } = req.body;
    if (!userId || !token || !newPassword)
      return res.status(400).json({ message: "Faltan datos" });

    const record = await passwordResetService.validateToken(userId, token);
    if (!record)
      return res.status(400).json({ message: "Token inválido o expirado" });

    const user = await userService.getUserById(userId);
    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });

    if (isValidatePassword(newPassword, user.password)) {
      return res
        .status(400)
        .json({
          message: "La nueva contraseña no puede ser igual a la anterior",
        });
    }

    const newHash = createHash(newPassword);
    await userService.addToPasswordHistory(user._id, user.password);
    await userService.updateUser(user._id, { password: newHash });

    await passwordResetService.markUsed(record._id);

    res.json({ message: "Contraseña restablecida" });
  };
}

export default UserController;
