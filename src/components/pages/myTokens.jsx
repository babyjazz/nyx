import Sidebar from "../common/myTokens/sidebar";
import Dashboard from "../common/myTokens/dashboard";

function MyTokens() {
  return (
    <div id='myTokens' className='h-screen md:flex'>
      <Sidebar />
      <Dashboard />
    </div>
  );
}

export default MyTokens;
