import { useLang } from '../../hooks/useLang'
import { CANCELLATION_POLICY } from '../../data/risks'

export default function PricingPage() {
  const { lang, t } = useLang()
  const policy = CANCELLATION_POLICY[lang]

  const tiers = [
    {
      name: t('common.standard'),
      pax: lang === 'th' ? '4–6 ท่าน' : '4–6 guests',
      price: lang === 'th' ? 'ราคาตามตาราง' : 'Listed price',
      desc:
        lang === 'th'
          ? 'กลุ่มมาตรฐาน ราคาดีที่สุด รอครบจำนวนขั้นต่ำ'
          : 'Standard small group — best value, departs when min pax met',
    },
    {
      name: t('common.private'),
      pax: lang === 'th' ? '1–3 ท่าน' : '1–3 guests',
      price: lang === 'th' ? 'ราคา Premium' : 'Premium rate',
      desc:
        lang === 'th'
          ? 'รับประกันออกเดินทาง ยืดหยุ่นกำหนดการ'
          : 'Guaranteed departure, flexible schedule',
    },
  ]

  return (
    <div className="space-y-8">
      <h1 className="font-serif text-2xl text-brand-dark">{t('nav.pricing')}</h1>

      <section>
        <h2 className="text-lg font-semibold text-brand-dark">{t('pricing.compare')}</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {tiers.map((tier) => (
            <div key={tier.name} className="rounded-2xl border border-gray-100 p-5">
              <h3 className="font-serif text-lg text-gold-dark">{tier.name}</h3>
              <p className="mt-1 text-sm font-medium text-brand-dark">{tier.pax}</p>
              <p className="mt-2 text-sm text-gray-600">{tier.desc}</p>
              <p className="mt-3 text-sm font-semibold text-brand-dark">{tier.price}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-brand-dark">{policy.title}</h2>
        <p className="mt-2 text-sm text-gray-600">{policy.intro}</p>
        <div className="mt-4 overflow-x-auto rounded-xl border border-gray-100">
          <table className="w-full min-w-[320px] text-left text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="px-3 py-2">{lang === 'th' ? 'เงื่อนไข' : 'Condition'}</th>
                <th className="px-3 py-2">{lang === 'th' ? 'ผลลัพธ์' : 'Outcome'}</th>
              </tr>
            </thead>
            <tbody>
              {policy.rules.map((rule) => (
                <tr key={rule.condition} className="border-t border-gray-100">
                  <td className="px-3 py-2 font-medium text-brand-dark">{rule.condition}</td>
                  <td className="px-3 py-2 text-gray-600">{rule.outcome}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
