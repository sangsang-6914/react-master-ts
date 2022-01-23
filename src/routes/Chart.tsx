import { useQuery } from "react-query"
import { fetchCoinHistory } from "../api"
import ApexChart from 'react-apexcharts'

interface IHIstorical {
    time_open: string;
    time_close: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    market_cap: number;
}

interface CoinProps {
    coinId: string
}

function Chart({coinId}: CoinProps) {
    console.log(coinId)
    const {isLoading, data} = useQuery<IHIstorical[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId))
    return <div>
        {isLoading ? "Loading chart..." : (
            <ApexChart
                type="line"
                series={[
                    {
                        name: "Price",
                        data: data?.map(p => p.close)
                    }
                ]}
                options={{
                    theme: {
                        mode: "dark"
                    },
                    chart: {
                        background: "transparent",
                        height: 300,
                        width: 500,
                        toolbar: {
                            show: false
                        }
                    },
                    grid: {
                        show: false
                    },
                    yaxis: {
                        show: false
                    },
                    xaxis: {
                        type: 'datetime',
                        labels: {
                            show: false
                        },
                        axisTicks: {
                            show: false
                        },
                        axisBorder: {
                            show: false
                        },
                        categories: data?.map(p => p.time_close),
                    },
                    fill: {
                        type: 'gradient',
                        gradient: {
                            gradientToColors: ['#44bd32'],
                            stops: [0, 100]
                        },
                    },
                    colors: ['#0097e6'],
                    stroke: {
                        curve: "smooth",
                        width: 3,
                    },
                    tooltip: {
                        y: {
                            formatter: (value) => `$ ${value.toFixed(3)}`
                        },
                        x: {
                            
                        }
                    }
                }}
            />
        )}
    </div>
}

export default Chart