import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getLocal, setLocal } from "../utils/localstorage.js";

const Cart = () => {
  const [cart, setCart] = useState(getLocal("Cart") || []);

  useEffect(() => {
    setLocal("Cart", cart);
  }, [cart]);

  const subtotal = useMemo(() => {
    return cart.reduce((total, car) => {
      return total + Number(car.price) * Number(car.quantity || 1);
    }, 0);
  }, [cart]);

  const total = subtotal ;

  const decreaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((car) =>
        car.id === id
          ? { ...car, quantity: Math.max(Number(car.quantity) - 1, 1) }
          : car
      )
    );
  };

  const increaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((car) =>
        car.id === id
          ? { ...car, quantity: Math.min(Number(car.quantity) + 1, 2) }
          : car
      )
    );
  };

  const removeCar = (id) => {
    setCart((prevCart) => prevCart.filter((car) => car.id !== id));
  };

  if (cart.length === 0) {
    return (
      <main className="min-h-screen bg-[#07090e] px-6 py-28 text-white md:px-16 lg:px-24">
        <div className="mx-auto flex min-h-[60vh] max-w-7xl flex-col items-center justify-center text-center">
          <p className="mb-4 text-sm font-black uppercase tracking-[0.35em] text-[#3E66FF]">
            Your Garage
          </p>

          <h1 className="text-6xl font-black uppercase leading-none text-[#F5F4EA] md:text-8xl">
            Cart Is Empty
          </h1>

          <p className="mt-6 max-w-xl text-lg text-[#8EA6C9]">
            You have not reserved any vehicles yet. Browse the inventory and add
            your favorite cars to the cart.
          </p>

          <Link
            to="/cars"
            className="mt-10 rounded-sm bg-[#F5F4EA] px-10 py-4 text-sm font-black uppercase tracking-[0.25em] text-black transition hover:bg-[#3E66FF] hover:text-white"
          >
            Browse Cars
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#07090e] px-6 py-28 text-white md:px-16 lg:px-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16">
          <div className="mb-6 flex items-center gap-5">
            <span className="h-px w-12 bg-[#3E66FF]"></span>

            <p className="text-sm font-black uppercase tracking-[0.35em] text-[#3E66FF]">
              Your Garage
            </p>
          </div>

          <h1 className="text-7xl font-black uppercase leading-none tracking-tight text-[#F5F4EA] md:text-9xl">
            Cart
          </h1>

        </div>

        <section className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_0.65fr]">
          <div className="space-y-8">
            {cart.map((car) => {
              const primaryImage = car.images?.[0];
              const quantity = Number(car.quantity || 1);
              const isMaxQuantity = quantity >= 2;

              return (
                <article
                  key={car.id}
                  className="border-b border-[#1D2B42] pb-8"
                >
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-[260px_1fr_170px] md:items-center">
                    <div className="relative h-40 overflow-hidden bg-[#10192A]">
                      <img
                        src={primaryImage}
                        alt={`${car.brand} ${car.model}`}
                        className="h-full w-full object-cover opacity-70"
                      />

                     

              
                    </div>

                    <div>
                      <p className="text-sm font-black uppercase tracking-[0.25em] text-[#3E66FF]">
                        {car.brand}
                      </p>

                      <h2 className="mt-2 text-3xl font-black text-[#F5F4EA]">
                        {car.model}
                      </h2>

                      <p className="mt-2 text-base text-[#8EA6C9]">
                        {car.engine} · {car.horsepower} HP
                      </p>

                      <div className="mt-6 flex items-center gap-4">
                        <p className="text-2xl font-black text-[#F5F4EA]">
                          ${Number(car.price).toLocaleString()}
                        </p>

                        <button
                          onClick={() => removeCar(car.id)}
                          className="flex h-10 w-10 items-center justify-center border border-[#263247] text-[#8EA6C9] transition hover:border-red-500 hover:text-red-500"
                        >
                          ×
                        </button>
                      </div>
                    </div>

                    <div>
                      <div className="flex h-14 items-center justify-between border border-[#263247]">
                        <button
                          onClick={() => decreaseQuantity(car.id)}
                          className="h-full w-12 text-xl font-bold text-white transition hover:bg-[#10192A]"
                        >
                          -
                        </button>

                        <span className="font-black text-white">
                          {quantity}
                        </span>

                        <button
                          disabled={isMaxQuantity}
                          onClick={() => increaseQuantity(car.id)}
                          className={`h-full w-12 text-xl font-bold transition ${
                            isMaxQuantity
                              ? "cursor-not-allowed text-[#3E66FF]/30"
                              : "text-white hover:bg-[#10192A]"
                          }`}
                        >
                          +
                        </button>
                      </div>

                      {isMaxQuantity && (
                        <p className="mt-3 text-center text-xs font-bold uppercase tracking-wider text-[#00E676]">
                          Max Quantity Reached
                        </p>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <aside className="h-fit border border-[#203049] bg-[#0B111D] p-8 shadow-2xl shadow-black/40 lg:sticky lg:top-28">
            <h2 className="mb-10 text-sm font-black uppercase tracking-[0.35em] text-[#8EA6C9]">
              Order Summary
            </h2>

            <div className="space-y-7">
              <div className="flex items-center justify-between text-lg">
                <span className="text-white">Subtotal</span>

                <span className="font-semibold text-white">
                  ${subtotal.toLocaleString()}
                </span>
              </div>

              
            </div>

            <div className="my-10 h-px bg-[#263247]"></div>

            <div className="flex items-end justify-between">
              <span className="text-sm font-black uppercase tracking-[0.25em] text-[#8EA6C9]">
                Total
              </span>

              <span className="text-5xl font-black text-[#F5F4EA]">
                ${total.toLocaleString()}
              </span>
            </div>

            <div className="mt-10 flex h-14 border border-[#263247]">
              <input
                type="text"
                placeholder="Promo code"
                className="w-full bg-transparent px-5 text-sm font-semibold text-white outline-none placeholder:text-[#6F86AA]"
              />

              <button className="border-l border-[#263247] px-6 text-sm font-black uppercase tracking-[0.2em] text-[#3E66FF] transition hover:bg-[#10192A]">
                Apply
              </button>
            </div>

            <button className="mt-8 h-16 w-full bg-[#F5F4EA] text-sm font-black uppercase tracking-[0.25em] text-black transition hover:bg-[#3E66FF] hover:text-white">
              Proceed To Checkout
            </button>

            <p className="mt-6 text-center text-sm tracking-wider text-[#6F86AA]">
              Secured reservation · Fully refundable deposit
            </p>
          </aside>
        </section>
      </div>
    </main>
  );
};

export default Cart;
