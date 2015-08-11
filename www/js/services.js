    angular
        .module('starter.services', ['ionic'])
        .factory('BronchodialatorFactory', BronchodialatorFactory);

    function BronchodialatorFactory()
    {
        var service = {
            isNormal: isNormal,
            severityCalculator: severityCalculator,
            changePostPercent: changePostPercent,
            diagnosis: diagnosis,
        };

        return service;

        function isNormal(pre) {
            return pre >= 80;
        }

        function severityCalculator(pre) {
            if (pre >= 80) {
                return 'Normal';
            }

            if (pre <= 79 && pre >= 70) {
                return 'Mild';
            }

            if (pre <= 79 && pre >= 50) {
                return 'Moderate';
            }

            if (pre < 50) {
                return 'Severe';
            }
        }

        function changePostPercent(pre, post) {
            return Math.abs(((pre - post) / post) * 100);
        }

        function diagnosis(pre, post) {
            var changePost = parseInt(changePostPercent(pre, post));
            var severity = severityCalculator(pre);

            if (changePost <= 10) {
                return 'COPD';
            } else if(changePost >= 12) {
                return 'Asthma';
            } else if(changePost >10 && changePost < 12){
                return 'FVC 200ml Change';
            } else {
                return 'Undetermined';
            }
        }
    }
