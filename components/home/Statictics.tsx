const stats = [
    {
        value: "100+",
        label: "Команд",
    },
    {
        value: "1000+",
        label: "Игроков",
    },
    {
        value: "20+",
        label: "Лиг",
    },
    {
        value: "5000+",
        label: "Матчей",
    },
];

export default function Statistics() {
    return (
        <div className="flex flex-col items-center">
            <h2 className="mb-5 text-center text-3xl font-bold">
                Статистика
            </h2>

            <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-4">
                {stats.map((stat) => (
                    <div
                        key={stat.label}
                        className="rounded-xl border p-6 text-center"
                    >
                        <div className="text-3xl font-bold">
                            {stat.value}
                        </div>

                        <div className="mt-2 text-sm text-muted-foreground">
                            {stat.label}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}