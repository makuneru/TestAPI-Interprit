/**
 * @description: Class for Object Storage functions
 *
 * @author Christian Balangatan <christian.balangatan@oracle.com>
 * @since 05/15/2022
 */

import fs from 'fs';
import logger from './Logger';
import shelljs from 'shelljs';
/**
 * This method will upoad data to Object Store
 *
 * @param testFolder   Main path where the data are saved ex: './src/data/test-data/'
 * @param rawFolder   Raw folder path ex: 'applicants/raw/'
 * @param cloudStorageUrl   Cloud Storage URL
 *
 */
export const UploadToObjectStorage = async (testFolder: string, rawFolder: string, cloudStorageUrl: string) => {
  try {
    const files = fs.readdirSync(testFolder);
    for (const file of files) {
      logger.info(file);
      let fi = testFolder + file;
      logger.info(`Uploading: ${fi}`);
      try {
        if (fs.statSync(fi).isFile()) {
          let curlCommand = `curl -X PUT -T ${fi} ${cloudStorageUrl}hr/cm/or/${rawFolder}`;
          logger.info(curlCommand);
          shelljs.exec(curlCommand);
        }
      } catch (e) {
        logger.error((e as Error).message);
      }
    }
  } catch (e) {
    logger.error((e as Error).message);
  }
};
