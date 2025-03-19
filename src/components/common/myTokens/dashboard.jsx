import ConnectWallet from "../buttons/connect_wallet";
import TokenView from "./tokenView";

function Dashboard() {
  return (
    <div className='font-[RobotoMono] w-full lg:p-8 p-4 flex flex-col gap-10'>
      <div className='md:flex hidden items-center justify-between'>
        <h1 className='text-[23px] font-extrabold bg-gradient-to-r from-[#5AB0FF] to-[#01FFC2] text-transparent bg-clip-text mt-2'>
          My Tokens
        </h1>
        <div className='flex items-center'>
          <ConnectWallet />
        </div>
      </div>
      <div className='flex flex-col w-full items-start gap-5'>
        <div className='w-full'>
          <h1 className='lg:text-[23px] text-lg font-extrabold   bg-gradient-to-r from-[#5AB0FF] to-[#01FFC2] inline-block text-transparent bg-clip-text'>
            Lorem ipsum dolor sit amet
          </h1>
          <p className='lg:text-lg text-sm font-medium text-white text-opacity-75'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
            auctor justo at tincidunt scelerisque. Curabitur vel augue eget
            turpis malesuada luctus.
          </p>
        </div>
        <div className='w-full'>
          <TokenView />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
