import { authFetch, ENV } from "@/utils";
import { assignWith, forEach } from "lodash";
import { useDebugValue } from "react";

export class Cart {
  add(productoId) {
    const productos = this.getAll();
    const objIndex = productos.findIndex(
      (producto) => producto.id === productoId
    );

    if (objIndex < 0) {
      productos.push({ id: productoId, quantity: 1 });
    } else {
      const producto = productos[objIndex];
      productos[objIndex].quantity = producto.quantity + 1;
    }

    localStorage.setItem(ENV.CART, JSON.stringify(productos));
  }

  getAll() {
    const response = localStorage.getItem(ENV.CART);

    if (!response) {
      return [];
    } else {
      return JSON.parse(response);
    }
  }

  count() {
    const response = this.getAll();
    let count = 0;

    forEach(response, (item) => {
      count += item.quantity;
    });

    return count;
  }

  changeQuantity(productoId, quantity) {
    const productos = this.getAll();
    const objIndex = productos.findIndex(
      (producto) => producto.id === productoId
    );

    productos[objIndex].quantity = quantity;
    localStorage.setItem(ENV.CART, JSON.stringify(productos));
  }

  delete(productoId) {
    const productos = this.getAll();

    const updateProductos = productos.filter(
      (producto) => producto.id !== productoId
    );

    localStorage.setItem(ENV.CART, JSON.stringify(updateProductos));
  }

  deleteAll() {
    localStorage.removeItem(ENV.CART);
  }

  async paymentCart(token, products, idUser, address) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.PAYMENY_ORDER}`;
      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          products,
          idUser,
          addressShipping: address,
        }),
      };

      const response = await authFetch(url, params);

      return response;
    } catch (error) {
      throw error;
    }
  }
}
