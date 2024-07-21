import { CartLayout } from "@/layouts";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useCart } from "@/hooks";
import { Producto } from "@/api";
import { Cart } from "@/components/Cart";

const productoCtrl = new Producto();  

export default function CartPage() {
  const {
    query: { step = 1 },
  } = useRouter();
  const currentStep = Number(step);
  const [productos, setProductos] = useState(null);
  const { cart } = useCart();

  useEffect(() => {
    (async () => {
      try {
        const data = [];
        if (cart) {
          for await (const item of cart) {
            const response = await productoCtrl.getProductoById(item.id);
            data.push({ ...response.data, quantity: item.quantity });
          }
          console.log(data);
          setProductos(data);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, [cart]);

  return (
    <>
      <CartLayout>
        {currentStep === 1 && <Cart.StepOne productos={productos}/>}
        {currentStep === 2 && <Cart.Steptwo productos={productos}/>}
        {currentStep === 3 && <Cart.StepThree/>}
      </CartLayout>
    </>
  );
}
