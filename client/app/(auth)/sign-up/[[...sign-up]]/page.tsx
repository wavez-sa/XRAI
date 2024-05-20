import { SignUp } from '@clerk/nextjs';

export default function Page() {
    return <SignUp path='/sign-up' afterSignOutUrl={'/'} afterSignUpUrl={'/chat'}/>;
}
