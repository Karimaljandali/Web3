export default function Counter({ amount }) {
    return (
        <>
            { amount === 10000 ? (
                <p className="text-white">We&apos;re Sold Out!</p>
            ) : (
                <p className="text-white">{ amount } minted out of 5000</p>
            )}
        </>
    )
}