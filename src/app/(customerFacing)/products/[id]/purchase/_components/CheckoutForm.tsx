"use client"

import { userOrderExists } from "@/app/actions/orders"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { formatCurrency } from "@/utils/Getter"
import {
  Elements,
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import Image from "next/image"
import { FormEvent, useState } from "react"

type CheckoutFormProps = {
  product: {
    id: string
    imagePath: string
    name: string
    priceInNaira: number
    description: string
  }
  clientSecret: string
}

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
)

export function CheckoutForm({ product, clientSecret }: CheckoutFormProps) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="max-w-5xl w-full mx-auto space-y-8 pt-[100px] md:pt-[150px] px-4">
      <div className="flex gap-4 items-center md:flex-row flex-col">
        <div className="flex-shrink-0 relative">
          <Image
            src={product.imagePath}
            width={300}
            height={300}
            alt={product.name}
            className="object-cover"
          />
        </div>
        <div className="flex justify-between w-full md:w-2/3">
          <div>
            <div className="text-lg">
              {formatCurrency(product.priceInNaira * quantity)}
            </div>
            <h1 className="text-md font-bold">{product.name}</h1>
            <div className="max-w-[150px] break-words">
              {product.description}dsahdsdgsagdsagdsajgsajdgsajhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh
            </div>
          </div>

          {/* create a vertical line to separate the product details and the purchase details */}
          <div className="border-r border-gray-300 h-[200px]"></div>
          
          {/* Increase the number of purcahses by adding a quantity input field */}
          <div className="flex space-x-2 items-center justify-center self-start">
            <label htmlFor="quantity">Quantity</label>
            <input
              type="number"
              name="quantity"
              id="quantity"
              min="1"
              max="10"
              onChange={(e) => setQuantity(+e.target.value)}
              defaultValue={quantity}
              className="p-4 border border-gray-300 rounded-lg"
            />
        </div>
        </div>
      </div>
      <Elements options={{ clientSecret }} stripe={stripePromise}>
        <Form priceInNaira={product.priceInNaira} productId={product.id} quantity={quantity} />
      </Elements>
    </div>
  )
}



function Form({
  priceInNaira,
  productId,
  quantity,
}: {
  priceInNaira: number
  productId: string
  quantity: number
}) {
  const stripe = useStripe()
  const elements = useElements()
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string>()
  const [email, setEmail] = useState<string>()

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()

    if (stripe == null || elements == null || email == null) return

    setIsLoading(true)

    const orderExists = await userOrderExists(email, productId)

    if (orderExists) {
      setErrorMessage(
        "You have already purchased this product. Try downloading it from the My Orders page"
      )
      setIsLoading(false)
      return
    }

    stripe
      .confirmPayment({
        elements,
        confirmParams: {
          return_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/stripe/purchase-success`,
        },
      })
      .then(({ error }) => {
        if (error.type === "card_error" || error.type === "validation_error") {
          setErrorMessage(error.message)
        } else {
          setErrorMessage("An unknown error occurred")
        }
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Checkout</CardTitle>
          {errorMessage && (
            <CardDescription className="text-destructive">
              {errorMessage}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <PaymentElement />
          <div className="mt-4">
            <LinkAuthenticationElement
              onChange={e => setEmail(e.value.email)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            size="lg"
            disabled={stripe == null || elements == null || isLoading}
          >
            {isLoading
              ? "Purchasing..."
              : `Purchase - ${formatCurrency(priceInNaira * quantity)}`}
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
