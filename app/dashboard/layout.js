import Menu from "./components/main/Menu";
import "./globals.css";

export const metadata = {
    title: "Dashboard - Aqary Store |لوحة التحكم - متجر عقاري",
    description: "عقارك هتلاقيه في عقاري، متجر عقاري هو الموقع العقاري الرائد في تجارة العقارات و الاستشارات العقارية و الاستثمارية في سواحل مصر و المدن الحديثة، استثمارك الآمن مع فريق عقاري - Generated By Rockai Dev",
};

export default function RootLayout({ children }) {
    
    return (
        <main className="dashboard">
            <Menu />
            {children}
        </main>
    );
}