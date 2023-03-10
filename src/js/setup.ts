import { MIME } from './mime-main';
import { MIMEConsole } from './vue/mime-console';
import '../css/styles.css';

export async function setup(ctx : ModContext) {
    Object.keys(MIME).forEach(key => {
        // @ts-ignore Because we're pushing very dynamic bindings to the global api object
        ctx.api({ [key]: MIME[key] });
    });

    const mimeConsole = MIMEConsole({ open: false });

    ctx.onInterfaceReady(() => {
        ui.create(mimeConsole, document.getElementById('main-container'));
    });

    MIME._internal.mimeConsole = mimeConsole;

    //const $console = (await MIME.querySelectorAsync('#mime-console-io')) as HTMLInputElement;
}