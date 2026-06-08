import prisma from "../config/prisma.js";

// ADD TO CART
export const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    if (!productId || !quantity || quantity < 1) {
      return res.status(400).json({ message: "Invalid input" });
    }

    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (quantity > product.stock) {
      return res.status(400).json({ message: "Insufficient stock" });
    }

    let cart = await prisma.cart.findUnique({
      where: { userId },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId },
      });
    }

    const existingItem = await prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId,
      },
    });

    if (existingItem) {
      const newQuantity = existingItem.quantity + quantity;

      if (newQuantity > product.stock) {
        return res.status(400).json({ message: "Exceeds stock limit" });
      }

      const updatedItem = await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: newQuantity },
      });

      return res.json(updatedItem);
    }

    const cartItem = await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId,
        quantity,
      },
    });

    res.status(201).json(cartItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET CART
export const getCart = async (req, res) => {
  try {
    const cart = await prisma.cart.findUnique({
      where: { userId: req.user.id },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!cart) {
      return res.json({
        items: [],
        totalQuantity: 0,
        totalPrice: 0,
      });
    }

    const totalPrice = cart.items.reduce(
      (sum, item) => sum + item.quantity * item.product.price,
      0,
    );

    const totalQuantity = cart.items.reduce(
      (sum, item) => sum + item.quantity,
      0,
    );

    res.json({
      ...cart,
      totalQuantity,
      totalPrice,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE CART ITEM QUANTITY
export const updateCartItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params; // cartItemId
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).json({ message: "Invalid quantity" });
    }

    // ensure item belongs to user's cart
    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id,
        cart: {
          userId,
        },
      },
    });

    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    if (quantity > cartItem.product?.stock) {
      return res.status(400).json({ message: "Exceeds stock" });
    }

    const updated = await prisma.cartItem.update({
      where: { id },
      data: { quantity },
    });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE CART ITEM
export const removeCartItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id,
        cart: {
          userId,
        },
      },
    });

    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    await prisma.cartItem.delete({
      where: { id },
    });

    res.json({ message: "Item removed from cart" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const clearCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await prisma.cart.findUnique({
      where: { userId },
    });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    await prisma.cartItem.deleteMany({
      where: {
        cartId: cart.id,
      },
    });

    res.json({ message: "Cart cleared successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
