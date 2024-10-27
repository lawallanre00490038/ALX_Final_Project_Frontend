
import db from "@/db/db"

const CURRENCY_FORMATTER = new Intl.NumberFormat("en-US", {
  currency: "NGN",
  style: "currency",
  minimumFractionDigits: 0,
})

export function formatCurrency(amount: number) {
  return CURRENCY_FORMATTER.format(amount)
}

const NUMBER_FORMATTER = new Intl.NumberFormat("en-US")

export function formatNumber(number: number) {
  return NUMBER_FORMATTER.format(number)
}

function wait(duration: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, duration)
  })
}


export const getUserData = async () => {

  const [userCount, orderData] = await Promise.all([
    db.user.count(),
    db.order.aggregate({
      _sum: { pricePaidInNaira: true },
    }),
  ]);

    return {
      userCount,
      averageValuePerUser: userCount=== 0 ? 0 : (orderData._sum.pricePaidInNaira || 0) / userCount / 100,
    };
};




export const getSalesData = async () => {
  const data = await db.order.aggregate({
    _sum: { pricePaidInNaira: true },
    _count: true,
  })

  await wait(2000)

  return {
    amount: (data._sum.pricePaidInNaira  || 0) / 100,
    numberOfSales: data._count,
  }
};


export const getProductData = async () => {
  const [activeCount, inactiveCount] = await Promise.all([
    db.product.count({
        where: {
           isAvailableForPurchase: true,
        }
    }),
    db.product.count({
      where: {
        isAvailableForPurchase: false,
      }
    })
  ]);

  return {
    activeCount,
    inactiveCount,
  }
}