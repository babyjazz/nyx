import { formatUnits } from "viem";

function TokenTable({ tokens, isLoading }) {
  if (isLoading) {
    return (
      <div className='flex flex-col items-center justify-center w-full h-full py-10 gap-3'>
        <h1 className='text-white'>Loading...</h1>
      </div>
    );
  }

  if (tokens.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center w-full h-full py-10 gap-3'>
        <h1 className='text-white'>You have no token</h1>
      </div>
    );
  }

  return (
    <table className='text-white text-left'>
      <thead>
        <tr>
          <th>Token</th>
          <th>Token Address</th>
          <th>Balance</th>
        </tr>
      </thead>
      <tbody>
        {tokens.map((token) => (
          <tr key={token.token_address}>
            <td>{token.name}</td>
            <td>{token.token_address}</td>
            <td>
              {/* {Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(formatUnits(token.balance, token.decimals))} */}
              ${formatUnits(token.balance, token.decimals)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TokenTable;
