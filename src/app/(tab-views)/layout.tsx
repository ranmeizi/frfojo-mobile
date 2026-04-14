import { ScrollView, View } from "@/components/adapt";
import AppTabBar from "@/components/layout/AppTabBar";

export default function TabViewsLayout({ children }: { children: React.ReactNode }) {
    return (
        <View style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <main style={{ height: 'calc(100% - 1.02rem)', overflow: 'hidden' }}>
                <ScrollView scrollY style={{ height: '100%' }}>
                    {children}
                </ScrollView>
            </main>
            <nav style={{ height: '1.02rem' }}>
                <AppTabBar />
            </nav>
        </View>
    );
}
