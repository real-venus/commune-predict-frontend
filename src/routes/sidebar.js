/** Icons are imported separatly to reduce build time */
import Squares2X2Icon from '@heroicons/react/24/outline/Squares2X2Icon'
import CurrencyDollarIcon from '@heroicons/react/24/outline/CurrencyDollarIcon'

const iconClasses = `h-6 w-6`

const routes = [

  {
    path: '/app/dashboard',
    icon: <Squares2X2Icon className={iconClasses}/>, 
    name: 'Dashboard',
  },
  {
    path: '/app/hot',
    icon: <CurrencyDollarIcon className={iconClasses}/>,
    name: 'HotSignal',
  },
  {
    path: '/app/long',
    icon: <CurrencyDollarIcon className={iconClasses}/>,
    name: 'LongSignal',
  },
  {
    path: '/app/short',
    icon: <CurrencyDollarIcon className={iconClasses}/>,
    name: 'ShortSignal',
  },
]

export default routes


