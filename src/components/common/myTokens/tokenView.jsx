import React, { useState, useEffect } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
// import { useReadContract } from "wagmi";
// import tokenStakingPoolABI from "../../assets/abi/tokenstakingpool.json";
import TokenTable from "./tokenTable";
import { useAccount, useBalance } from "wagmi";

function TokenView() {
  const { isConnected, address } = useAccount();

  // const {
  //   data: amountToken,
  //   isError,
  //   isLoading,
  //   isFetched,
  //   status,
  // } = useReadContract({
  //   abi: tokenStakingPoolABI,
  //   address: tokenStakingPoolContracts[0],
  //   functionName: "amountStaked",
  //   args: ["0x8Db2Ec88263267d025dED29Db1049D13B9D221b7"],
  //   watch: true,
  // });

  // if (!isLoading && !isError) {
  //   console.log("The counter value is ", amountToken.toString());
  // }

  // useEffect(() => {
  //   console.log(isFetched, isLoading, status);
  //   if (isFetched) {
  //     console.log(amountToken);
  //   }
  // }, [isFetched]);

  // useEffect(() => {
  //   setAmountStakedToken(amountToken);
  // }, [amountToken]);

  return (
    <div className='font-[RobotoMono] flex flex-col gap-5'>
      <div>
        <h1 className='lg:text-[23px] text-lg font-extrabold   bg-gradient-to-r from-[#5AB0FF] to-[#01FFC2] inline-block text-transparent bg-clip-text'>
          Tokens (0)
        </h1>
      </div>
      <div className='w-full border border-slate-500 rounded-xl lg:px-6 px-3 py-5 relative bg-black bg-opacity-75 flex flex-col gap-5'>
        <div className='flex flex-col items-center justify-center w-full h-full py-10 gap-3'>
          <img
            src='./assets/images/icon/crypto_wallet.png'
            alt='None'
            className='md:h-24 h-16 w-auto'
          />
          <h1 className='text-center text-xl font-semibold text-gray-100'>
            {isConnected ? "You have no token" : "Please connect wallet"}
          </h1>
          <ConnectButton.Custom>
            {({
              account,
              chain,
              openConnectModal,
              authenticationStatus,
              mounted,
            }) => {
              // Note: If your app doesn't use authentication, you
              // can remove all 'authenticationStatus' checks
              const ready = mounted && authenticationStatus !== "loading";
              const connected =
                ready &&
                account &&
                chain &&
                (!authenticationStatus ||
                  authenticationStatus === "authenticated");

              return (
                <div>
                  {(() => {
                    if (!connected) {
                      return (
                        <button
                          className='w-[170px] clipButton font-[Nippo] h-[40px] text-[15px]'
                          onClick={openConnectModal}
                          type='button'
                        >
                          Connect Wallet
                        </button>
                      );
                    }

                    return <TokenTable />;
                  })()}
                </div>
              );
            }}
          </ConnectButton.Custom>
        </div>
      </div>
    </div>
  );
}

export default TokenView;
