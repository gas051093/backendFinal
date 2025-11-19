export const cartOwner = (req, res, next) => {
  try {
    const { cid } = req.params;
    const userCart = req.user.cart?.toString();

    if (!userCart) {
      return res.status(403).json({
        status: "error",
        message: "El usuario no tiene carrito asignado",
      });
    }

    if (cid !== userCart) {
      return res.status(403).json({
        status: "error",
        message: "No tenés permiso para modificar este carrito",
      });
    }

    next();
  } catch (err) {
    res.status(500).json({ message: "Error en el servidor", err: err.message });
  }
};
