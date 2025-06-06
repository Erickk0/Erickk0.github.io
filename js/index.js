const resolver = {
  resolve: function resolve(options, callback) {
    // The string to resolve
    const resolveString = options.resolveString || options.element.getAttribute('data-target-resolver');
    const combinedOptions = Object.assign({}, options, {resolveString: resolveString});

    function getRandomInteger(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function randomCharacter(characters) {
      return characters[getRandomInteger(0, characters.length - 1)];
    }

    function doRandomiserEffect(options, callback) {
      const characters = options.characters;
      const timeout = options.timeout;
      const element = options.element;
      const partialString = options.partialString;

      let iterations = options.iterations;

      setTimeout(() => {
        if (iterations >= 0) {
          const nextOptions = Object.assign({}, options, {iterations: iterations - 1});

          if (iterations === 0) {
            element.innerHTML = partialString; 
          } else {
            element.innerHTML = partialString.substring(0, partialString.length - 1) + randomCharacter(characters); 
          }

          doRandomiserEffect(nextOptions, callback);
        } else if (typeof callback === "function") {
          callback();
        }
      }, options.timeout);
    }

    function doResolverEffect(options, callback) {
      const resolveString = options.resolveString;
      const characters = options.characters;
      const offset = options.offset;
      const partialString = resolveString.substring(0, offset).replace(/\n/g, '<br>'); 
      const combinedOptions = Object.assign({}, options, {partialString: partialString});

      doRandomiserEffect(combinedOptions, () => {
        const nextOptions = Object.assign({}, options, {offset: offset + 1});

        if (offset <= resolveString.length) {
          doResolverEffect(nextOptions, callback);
        } else if (typeof callback === "function") {
          callback();
        }
      });
    }

    doResolverEffect(combinedOptions, callback);
  }
}

const strings = [
  'My name is Erick Zeiler, and I am currently a student at Hochschule Rhein-Main in Germany.\n' +
  'I am in my sixth semester of studies. \n\n\n' +
  'My Skills:\n' +
  'Java\n' +
  'Python\n' +
  'CSharp\n' +
  'HTML, CSS, Javascript, NodeJS\n' +
  'SQL\n' +
  'REST APIs \n' +
  'My Interests:\n' +
  'AI\n' +
  'Data Science\n' +
  'Game Development\n' +
  'Quantum Computing\n' +
  'Writing good Code\n'
];

let counter = 0;

const options = {
  offset: 0,
  timeout: 5,
  iterations: 10,
  characters: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'x', 'y', 'x', '#', '%', '&', '-', '+', '_', '?', '/', '\\', '='],
  resolveString: strings[counter].replace(/\n/g, '<br>'), 
  element: document.querySelector('[data-target-resolver]')
}

function callback() {
  setTimeout(() => {
    counter++;

    if (counter >= strings.length) {
      counter = 0;
    }

    let nextOptions = Object.assign({}, options, {resolveString: strings[counter].replace(/\n/g, '<br>')}); 
    resolver.resolve(nextOptions, callback);
  }, 1000);
}

resolver.resolve(options, callback);

