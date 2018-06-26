import Link from 'next/link'
export default () => (
  <div>Hello World. <br/> 
  <Link href='/login'><a>Login</a></Link>  |  
  <Link href='/signup'><a>Sign Up</a></Link>  |  
  <Link href='/account'><a>Account Info</a></Link>  
  </div>
)


