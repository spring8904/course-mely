const data = [
  { name: 'Học viên', value: '1.000.000+' },
  { name: 'Giảng viên', value: '1.000+' },
  { name: 'Khoá học', value: '2.000+' },
]

export const StatisticsOverview = () => (
  <section className="flex items-center justify-evenly bg-gray-200 py-16">
    {data.map((item, index) => (
      <div key={index} className="flex flex-col items-center space-y-2">
        <h3 className="text-5xl font-bold">{item.value}</h3>
        <p className="text-lg">{item.name}</p>
      </div>
    ))}
  </section>
)
