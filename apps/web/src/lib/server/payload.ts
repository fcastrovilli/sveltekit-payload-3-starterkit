import { BasePayload, getPayload, type SanitizedConfig } from 'payload';
import { importConfig } from 'payload/node';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { building } from '$app/environment';

let payloadInstance: BasePayload | null = null;

async function initPayload() {
	if (!payloadInstance && !building) {
		try {
			const __dirname = path.dirname(fileURLToPath(import.meta.url));
			const payloadConfigPath: string = path.join(__dirname, '../../../payload/payload.config.ts');

			console.log(payloadConfigPath);

			const awaitedConfig: SanitizedConfig = await importConfig(payloadConfigPath);
			payloadInstance = await getPayload({ config: awaitedConfig });
		} catch (error) {
			console.log('error', error);
			payloadInstance = null;
		}
		return payloadInstance;
	}
}

export const payload = payloadInstance ? payloadInstance : await initPayload();
