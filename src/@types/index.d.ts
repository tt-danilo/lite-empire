type GlobalContext = {
  state: any
  dispatch: React.Dispatch<any>
}

declare interface IConfigProps {
  page: number,
  monetization: string
}

declare type IMonetizationType =
| "Affiliate"
| "Amazon Associates"
| "Amazon FBA"
| "Amazon FBM"
| "Amazon KDP"
| "Amazon Merch"
| "Application"
| "Digital Product"
| "Display Advertising"
| "DropShipping"
| "eCommerce"
| "Info Product"
| "Lead Gen"
| "Other"
| "SaaS"
| "Service"
| "Subscription"
| "Subscription-Box"