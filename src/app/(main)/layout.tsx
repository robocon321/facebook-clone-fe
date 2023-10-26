import MainContentContainer from 'components/common'
import Navbar from 'components/limb/navbar'

export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="w-full h-full flex flex-col">
            <Navbar />
            <MainContentContainer>{children}</MainContentContainer>
        </div>
    )
}
