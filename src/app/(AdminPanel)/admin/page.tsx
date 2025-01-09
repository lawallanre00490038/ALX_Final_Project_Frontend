import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DayshBoardCardProps } from "@/types/TypesProps";
import { getSalesData, formatCurrency, formatNumber, getUserData, getProductData } from "@/utils/Getter";

const AdminPage = async () => {
  // Get sales data and user data and product data
  const [salesData, userData, ProductData] = await Promise.all([getSalesData(), 
    getUserData(),
    getProductData(),
  ]);

  // Render dashboard cards
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-3 p-4 md:p-0 text-white">
      <DayshBoardCard  title="Sales" 
        subtitle={`${formatNumber(salesData.numberOfSales)} Orders`} 
        body={formatCurrency(salesData.amount)} 
      />

      <DayshBoardCard  title="Customers" 
        subtitle={`${formatCurrency(userData.averageValuePerUser)} Average Value`} 
        body={formatNumber(userData.userCount)} 
      />

      <DayshBoardCard  title="Active Products" 
        subtitle={`${formatNumber(ProductData.inactiveCount)} Average Value`} 
        body={formatNumber(ProductData.activeCount)} 
      />
    </div>
  );
}

export default AdminPage;



const DayshBoardCard = ({title, subtitle, body}: DayshBoardCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{subtitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{body}</p>
      </CardContent>
    </Card>
  );
}


