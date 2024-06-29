//GENERATE links:scripT
const { Dropbox } = require('dropbox');
const fetch = require('node-fetch'); // You need this for Dropbox SDK

const ACCESS_TOKEN = '';

const dbx = new Dropbox({ accessToken: ACCESS_TOKEN, fetch: fetch });

const getFolderLinks = async (folderPath) => {
  try {
    // List folders inside the specified folder
    const response = await dbx.filesListFolder({ path: folderPath });
    console.log('Response:', response);

    // Check if the response contains entries
    if (!response.result.entries) {
      throw new Error('Invalid response from Dropbox API');
    }

    // Filter only folders
    const folders = response.result.entries.filter(entry => entry['.tag'] === 'folder');

    // Create shared links for each folder
    const links = await Promise.all(
      folders.map(async folder => {
        try {
          const sharedLink = await dbx.sharingCreateSharedLinkWithSettings({
            path: folder.path_lower
          });
          return {
            name: folder.name,
            link: sharedLink.url
          };
        } catch (error) {
          console.error(`Failed to create shared link for folder ${folder.name}:`, error);
          return null;
        }
      })
    );

    // Filter out any null values (in case of errors)
    const validLinks = links.filter(link => link !== null);

    console.log('Folder Links:', validLinks);
    return validLinks;

  } catch (error) {
    console.error('Error listing folders:', error);
  }
};

// Use relative path for Dropbox API
// const dropboxFolderPath = '/USIOOC/USIOOC ALL COUNTRIES/ARGENTINA';
// const dropboxFolderPath = '/USIOOC/USIOOC ALL COUNTRIES/BRAZIL';
// const dropboxFolderPath = '/USIOOC/USIOOC ALL COUNTRIES/CROATIA';
// const dropboxFolderPath = '/USIOOC/USIOOC ALL COUNTRIES/GREECE';
// const dropboxFolderPath = '/USIOOC/USIOOC ALL COUNTRIES/ITALY';
// const dropboxFolderPath = '/USIOOC/USIOOC ALL COUNTRIES/SAUDI ARABIA';
// const dropboxFolderPath = '/USIOOC/USIOOC ALL COUNTRIES/SPAIN';
// const dropboxFolderPath = '/USIOOC/USIOOC ALL COUNTRIES/TUNISIA';
// const dropboxFolderPath = '/USIOOC/USIOOC ALL COUNTRIES/turkey';
// const dropboxFolderPath = '/USIOOC/USIOOC ALL COUNTRIES/ALGERIA';
// const dropboxFolderPath = '/USIOOC/USIOOC ALL COUNTRIES/LIBYA';
// const dropboxFolderPath = '/USIOOC/USIOOC ALL COUNTRIES/PORTUGAL';




const dropboxFolderPath = '/AAIOOC/Certificate OF participation/13 exports';


getFolderLinks(dropboxFolderPath);


// https://www.dropbox.com/developers/apps/info/87uqvhgevt9w5nw