export enum Language {
  JAVASCRIPT = 'javascript',
  TYPESCRIPT = 'typescript',
  PYTHON = 'python',
  JAVA = 'java',
  PHP = 'php',
}

export const LANGUAGE_CONFIG: {
  [key in Language]: {
    displayName: string
    fileExtension: string
    sampleFileName: string
    version: string
    codeSnippet: string
  }
} = {
  [Language.JAVASCRIPT]: {
    displayName: 'JavaScript',
    fileExtension: 'js',
    sampleFileName: 'script.js',
    version: '18.15.0',
    codeSnippet: `console.log('Hello world!');`,
  },
  [Language.TYPESCRIPT]: {
    displayName: 'TypeScript',
    fileExtension: 'ts',
    sampleFileName: 'app.ts',
    version: '5.0.3',
    codeSnippet: `console.log('Hello world!');`,
  },
  [Language.PYTHON]: {
    displayName: 'Python',
    fileExtension: 'py',
    sampleFileName: 'main.py',
    version: '3.10.0',
    codeSnippet: `print('Hello world!')`,
  },
  [Language.JAVA]: {
    displayName: 'Java',
    fileExtension: 'java',
    sampleFileName: 'Main.java',
    version: '15.0.2',
    codeSnippet: `public class Main {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello world!");\n\t}\n}`,
  },
  [Language.PHP]: {
    displayName: 'PHP',
    fileExtension: 'php',
    sampleFileName: 'index.php',
    version: '8.2.3',
    codeSnippet: `<?php echo 'Hello world!';`,
  },
}
