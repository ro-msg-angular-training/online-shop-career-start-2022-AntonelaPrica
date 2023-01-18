import { Router} from '@angular/router';

export const routingGuard = async (url: string, router: Router, userIsLoggedIn: boolean): Promise<boolean> => {
    if (!userIsLoggedIn) {
        await router.navigateByUrl(url);
        return false;
    }
    return true;
}