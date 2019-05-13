import files from '../src/Filesystem';
import { projectPath } from './helpers';
import { TestSuiteCollection } from '../src/TestSuiteCollection';
import { TextDocument } from 'vscode-languageserver-protocol';

describe('TestCollection', () => {
    const path = projectPath('');
    const suites = new TestSuiteCollection();

    it('instance', () => {
        expect(suites).toBeInstanceOf(TestSuiteCollection);
    });

    it('all', async () => {
        expect(
            Array.from((await suites.load(path)).all().values()).map(suite => ({
                id: suite.id,
                label: suite.label,
            }))
        ).toEqual([
            jasmine.objectContaining({
                id: 'Recca0120\\VSCode\\Tests\\AssertionsTest',
                label: 'AssertionsTest',
            }),
            jasmine.objectContaining({
                id: 'Recca0120\\VSCode\\Tests\\CalculatorTest',
                label: 'CalculatorTest',
            }),
            jasmine.objectContaining({
                id: 'Recca0120\\VSCode\\Tests\\Directory\\HasPropertyTest',
                label: 'HasPropertyTest',
            }),
            jasmine.objectContaining({
                id: 'Recca0120\\VSCode\\Tests\\Directory\\LeadingCommentsTest',
                label: 'LeadingCommentsTest',
            }),
        ]);
    });

    it('get', async () => {
        expect(
            await suites.get(projectPath('tests/AssertionsTest.php'))
        ).toEqual(
            jasmine.objectContaining({
                id: 'Recca0120\\VSCode\\Tests\\AssertionsTest',
                label: 'AssertionsTest',
            })
        );
    });

    it('put text document', async () => {
        const file = projectPath('tests/AssertionsTest.php');
        const textDocument = TextDocument.create(
            'foo.php',
            'php',
            0,
            await files.get(file)
        );

        suites.putTextDocument(textDocument);

        expect(await suites.get(file)).toEqual(
            jasmine.objectContaining({
                id: 'Recca0120\\VSCode\\Tests\\AssertionsTest',
                label: 'AssertionsTest',
            })
        );
    });
});