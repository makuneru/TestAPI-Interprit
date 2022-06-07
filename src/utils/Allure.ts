import { allure } from 'allure-mocha/runtime';
import logger from './Logger';

/**
 * @description: Class for Allure Reporter functions
 *
 * @author Christian Balangatan <christian.balangatan@oracle.com>
 * @since 06/02/2022
 */
export class Allure {
  /**
   * This method outputs logs into generated Allure Report and console
   *
   * @param type   type of the step (PASSED or FAILED)
   * @param desc desc to be included on the logs
   *
   */
  async log(type: string, desc: string, content?: string) {
    switch (type.toUpperCase()) {
      case 'INFO':
        allure.logStep(desc);
        logger.info(desc); // to output logs in terminal
        break;
      case 'ATTACHMENT':
        allure.testAttachment(desc, `${content}`, 'text/plain');
        logger.info(content); // to output logs in terminal
        break;
      case 'PASSED':
        allure.logStep(desc);
        logger.info(desc); // to output logs in terminal
        break;
      case 'FAILED':
        allure.logStep(desc);
        logger.error(desc); // to output logs in terminal
        throw new Error(desc); // to stop the execution of current test
      default:
        logger.error(`type invalid: ${type}`);
    }
  }
}
export default new Allure();
