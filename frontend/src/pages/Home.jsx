import { NavLink } from"react-router-dom"

export const Home=()=>{
    return (
        <main>
            <div className="home_container borr-2 w-3/4 mx-auto px-4 py-8">
                <div className="bg-slate-100 w-3/5 mx-auto p-4 rounded-lg flex flex-col gap-2">
                    <h3 className="font-bold">Total Income: &nbsp;<span className="font-normal">Rs.13244</span></h3> 
                    <h3 className="font-bold">Total Spend: &nbsp;<span className="font-normal">Rs.13244</span></h3> 
                    <h3 className="font-bold">Max Spend at: &nbsp;<span className="font-normal">Rs.13244</span></h3> 
                </div>
                <form className="w-3/5 mx-auto pt-8 flex justify-center gap-2">
                    <input type="text" name="expense" id="expense" placeholder="Enter new expense.." className="border-2 w-3/4 px-2 py-1 rounded-lg border-slate-100 outline-none" />
                    <button className="bg-sky-500 px-4 rounded-lg text-white hover:bg-sky-400">Add</button>
                </form>
                <NavLink to="/expense" className="block w-3/5 mx-auto ps-16 text-slate-400 text-sm">View all expenses..</NavLink>
                <div className="py-12">
                    <h2 className="text-center text-4xl font-bold pb-4">Our Features</h2>
                    <div className="card-container grid grid-cols-3 px-4 gap-y-6">
                        <div className="card flex flex-col items-center gap-2 p-2 w-[300px]">
                            <img src="https://moneylover.me/img/features/1.svg" alt="feature1" />
                            <h3 className="text-xl font-semibold">Multiple devices</h3>
                            <p className="text-center text-md">Safely synchronize across devices with Bank standard security.</p>
                        </div>

                        <div className="card flex flex-col items-center gap-2 p-2 w-[300px]">
                            <img src="https://moneylover.me/img/features/2.svg" alt="feature1" />
                            <h3 className="text-xl font-semibold">Recurring transaction</h3>
                            <p className="text-center text-md">Get notified of recurring bills and transactions before due date.</p>
                        </div>

                        <div className="card flex flex-col items-center gap-2 p-2 w-[300px]">
                            <img src="https://moneylover.me/img/features/3.svg" alt="feature1" />
                            <h3 className="text-xl font-semibold">Travel mode</h3>
                            <p className="text-center text-md">All currencies supported with up-to-date exchange rate.</p>
                        </div>

                        <div className="card flex flex-col items-center gap-2 p-2 w-[300px]">
                            <img src="https://moneylover.me/img/features/4.svg" alt="feature1" />
                            <h3 className="text-xl font-semibold">Saving plan</h3>
                            <p className="text-center text-md">Keep track on savings process to meet your financial goals.</p>
                        </div>

                        <div className="card flex flex-col items-center gap-2 p-2 w-[300px]">
                            <img src="https://moneylover.me/img/features/5.svg" alt="feature1" />
                            <h3 className="text-xl font-semibold">Debt and loan</h3>
                            <p className="text-center text-md">Manage your debts, loans and payment process in one place.</p>
                        </div>

                        <div className="card flex flex-col items-center gap-2 p-2 w-[300px]">
                            <img src="https://moneylover.me/img/features/6.svg" alt="feature1" />
                            <h3 className="text-xl font-semibold">Effortless transaction entry</h3>
                            <p className="text-center text-md">Entry a transaction quickly and easily, manually or automatically.</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="flex gap-8 items-center w-3/4 mx-auto py-12">
                        <img src="https://moneylover.me/img/details/Transaction@4x.png" alt="" className="w-[350px] shadow-lg rounded-lg" />
                        <div>
                            <h3 className="text-4xl py-4">Simple money tracker</h3>
                            <p>It takes seconds to record daily transactions. Put them into clear and visualized categories such as Expense: Food, Shopping or Income: Salary, Gift.</p>
                        </div>
                    </div>
                    <div className="flex gap-8 items-center w-3/4 mx-auto py-12">
                        <div>
                            <h3 className="text-4xl py-4">Painless budgeting</h3>
                            <p>It takes seconds to record daily transactions. Put them into clear and visualized categories such as Expense: Food, Shopping or Income: Salary, Gift.</p>
                        </div>
                        <img src="https://moneylover.me/img/details/budget@4x.png" alt="" className="w-[350px] shadow-lg rounded-lg" />
                    </div>
                    <div className="flex gap-8 items-center w-3/4 mx-auto py-12">
                        <img src="https://moneylover.me/img/details/REPORT@4x.png" alt="" className="w-[350px] shadow-lg rounded-lg" />
                        <div>
                            <h3 className="text-4xl py-4">The whole picture in one place</h3>
                            <p>One report to give a clear view on your spending patterns. Understand where your money comes and goes with easy-to-read graphs.</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}