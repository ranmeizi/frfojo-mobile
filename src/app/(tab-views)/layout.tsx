import { View } from "@/components/adapt";
import AppTabBar from "@/components/layout/AppTabBar";
import { Page } from "@/components/layout/Page";

export default function TabViewsLayout({ children }: { children: React.ReactNode }) {
    return (
        <Page>
            <View style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <main style={{ flex: 1 }}>
                    {children}
                </main>
                <nav>
                    <AppTabBar />
                </nav>
            </View>
        </Page>
    );
}