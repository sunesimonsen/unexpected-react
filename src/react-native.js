import types from './types/types';
import * as shallowAssertions from './assertions/shallowAssertions';


module.exports = {
    name: 'unexpected-react',

    installInto(expect) {

        expect.installPlugin(require('magicpen-prism'));

        types.installInto(expect);
        shallowAssertions.installInto(expect);

        expect.addAssertion('<ReactTestRenderer|ReactTestRendererOutput> to (match|satisfy) snapshot', function (expect) {

            expect.errorMode = 'bubble';
            expect.fail({
                message: function (output) {
                    return output.text('To use the ')
                        .error('`to ')
                        .error(this.flags.match ? 'match' : 'satisfy')
                        .error(' snapshot`')
                        .text(' assertion with the test renderer, require unexpected-react as `require(\'unexpected-react/test-rendered-jest\');`');
                }
            });
        });

        expect.addAssertion(
            [
                '<ReactElement|ReactShallowRenderer|ReactShallowRendererPendingEvent> to match snapshot',
                '<ReactElement|ReactShallowRenderer|ReactShallowRendererPendingEvent> to satisfy snapshot'
            ],
            function (expect) {
                expect.errorMode = 'bubble';
                expect.fail({
                    message: (output) => {
                        return output.text('To use the `')
                            .error(this.testDescription)
                            .text('` assertion with the shallow and full DOM renderers, require unexpected-react as `require(\'unexpected-react/jest\');`');
                    },
                    diff: (output) => {
                        return output;
                    }
                });
            });
    },

    clearAll() {}
};
