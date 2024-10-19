"use client"
import BarChart from "./BarChart";
import PieChart from "./PieChart";
import PolarChart from "./PolarChart";
import HorizontalBar from "./HorizontalBar";

function Charts() {
    return (
        <main>
            <div className="flex flex-col gap-5 text-center w-full mb-12">
            <h2>Employee Performance</h2>
                <HorizontalBar />
            </div>

            <div className="flex flex-1 gap-5 text-center max-lg:flex-col">
                <div className="rounded-[8px] border border-dark-3 p-8">
                    <h2>Hired Employees by month</h2>
                    <BarChart />
                    <h2 className="p-8">Employee Gender</h2>
                    <PieChart />
                </div>

                <div className="rounded-[8px] border border-dark-3 p-8">
                    <h2 className="pb-5">Employees by branch</h2>
                    <PolarChart />
                </div>
            </div>
        </main>
    );
}

export default Charts;
