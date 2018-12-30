const Logger = require('./helpers/Logger');
const puzzle = require('./puzzle');
const fishing = require('./fishing');

const script = process.argv[2];

async function main() {
  try {
    switch (script) {
      case 'puzzle':
        await puzzle();
        break;
      case 'fishing':
        await fishing();
        break;

      default:
        Logger.error(`Invalid script '${script}'.`);
        break;
    }
  } catch (error) {
    Logger.error('The main process crashed with the error:', error);
  }
}

main();
