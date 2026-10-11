import { ContactForm } from "@/components/ContactForm";
import { SiteHeader } from "@/components/SiteHeader";
import { formatHoursRange, SHOP_ADDRESS, weeklyHours } from "@/data/hours";
import { formatPrice, menuCategories } from "@/data/menu";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="top">
        <header className="hero">
          <p className="hero__eyebrow">Bangkok · Specialty Coffee</p>
          <h1>Bean &amp; Brew</h1>
          <p className="hero__lead">
            Welcome to our cozy corner of Sukhumvit. We roast small batches, bake
            fresh pastries daily, and pour every cup with care.
          </p>
        </header>

        <section id="menu" className="section" aria-labelledby="menu-heading">
          <h2 id="menu-heading">Menu</h2>
          <p className="section__intro">
            Thoughtful drinks and bites — prices in Thai baht.
          </p>
          <div className="menu-grid">
            {menuCategories.map((category) => (
              <article className="menu-category card" key={category.id}>
                <h3>{category.title}</h3>
                <ul className="menu-list">
                  {category.items.map((item) => (
                    <li className="menu-item" key={item.name}>
                      <div className="menu-item__header">
                        <span className="menu-item__name">{item.name}</span>
                        <span className="menu-item__price">
                          {formatPrice(item.priceBaht)}
                        </span>
                      </div>
                      <p className="menu-item__desc">{item.description}</p>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="hours" className="section" aria-labelledby="hours-heading">
          <h2 id="hours-heading">Hours</h2>
          <div className="hours-card card">
            <table className="hours-table">
              <caption className="visually-hidden">
                Opening hours for Bean and Brew
              </caption>
              <thead>
                <tr>
                  <th scope="col">Day</th>
                  <th scope="col">Hours</th>
                </tr>
              </thead>
              <tbody>
                {weeklyHours.map((row) => (
                  <tr
                    key={row.day}
                    className={
                      row.day === "Saturday" || row.day === "Sunday"
                        ? "hours-table__weekend"
                        : undefined
                    }
                  >
                    <th scope="row">{row.day}</th>
                    <td>{formatHoursRange(row.open, row.close)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <address className="address">
              <span className="address__label">Visit us</span>
              <span className="address__text">{SHOP_ADDRESS}</span>
            </address>
          </div>
        </section>

        <section id="contact" className="section" aria-labelledby="contact-heading">
          <h2 id="contact-heading">Contact</h2>
          <p className="section__intro">
            Questions or table requests? Send a note — we reply within a day.
          </p>
          <ContactForm />
        </section>
      </main>
      <footer className="site-footer">
        <p>&copy; {new Date().getFullYear()} Bean &amp; Brew</p>
      </footer>
    </>
  );
}
