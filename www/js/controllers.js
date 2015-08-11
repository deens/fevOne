    angular
    .module('starter.controllers', [])
    .controller('BronchodialatorController', BronchodialatorController)
    .controller('AsthmaController', AsthmaController)

    function BronchodialatorController($scope, BronchodialatorFactory) {
        var vm = this;

        vm.data = {
            pre: 80,
            post: 80,
            severity: 'Normal',
            diagnosis: 'Incompleted'
        };

        $scope.$watch('vm.data.pre', function() {
            if (parseInt(vm.data.post) <= parseInt(vm.data.pre) || parseInt(vm.data.post) >= parseInt(vm.data.pre)) {
                vm.data.post = parseInt(vm.data.pre);
            }

            if (BronchodialatorFactory.isNormal(vm.data.pre)) {
                vm.data.severity = 'Normal';
            } else {
                vm.data.severity = BronchodialatorFactory.severityCalculator(vm.data.pre);
            }

            vm.data.diagnosis = 'Undetermined';
        });

        $scope.$watch('vm.data.post', function() {
            if (parseInt(vm.data.post) < parseInt(vm.data.pre)) {
                vm.data.post = parseInt(vm.data.pre);
            }

            if ( parseInt(vm.data.post) > parseInt(vm.data.pre) ) {
                if (vm.data.severity === 'Normal') {
                    vm.data.severity = 'Mild';
                }
            } else {
                vm.data.severity = BronchodialatorFactory.severityCalculator(vm.data.pre);
            }

            if (parseInt(vm.data.post) === parseInt(vm.data.pre)) {
                vm.data.diagnosis = 'Undetermined ';
            }  else {
                vm.data.diagnosis = BronchodialatorFactory.diagnosis(vm.data.pre, vm.data.post);
            }

        });

        vm.reset = function() {
            vm.data = {
                pre: 80,
                post: 80,
                severity: 'Normal',
                diagnosis: 'Undetermined'
            };
        }
    }

    function AsthmaController($scope, $ionicModal) {
        var vm = this;
        vm.preFev1Percent = 80;
        vm.postChange = 0;
        vm.diagnosis = 'Undetermined';
        vm.severity = 'Normal';
        vm.measCheck = false;

        vm.preFev1Meas = 1.01;
        vm.postFev1Meas = 1.01;

        $scope.$watch('vm.preFev1Percent', function() {
            vm.severity = severityCalculator(vm.preFev1Percent);
        });

        $scope.$watch('vm.postChange', function() {
            vm.diagnosis = diagnosisCalculator(vm.postChange);

            if (vm.diagnosis === 'Check') {
                vm.measCheck = true;
                vm.diagnosis = 'Undertermined';

                vm.severity = severityCalculator(vm.preFev1Percent);
            } else {
                vm.measCheck = false;
            }

            if (vm.diagnosis !== 'Undetermined' && vm.severity === 'Normal') {
                vm.severity = 'Mild';
            } else {
                vm.severity = 'Normal';
            }

        });

        $scope.$watch('vm.preFev1Meas', function() {
            vm.postFev1Meas = vm.preFev1Meas;

        });

        $scope.$watch('vm.postFev1Meas', function() {
            if (vm.postFev1Meas < vm.preFev1Meas) {
                vm.postFev1Meas = vm.preFev1Meas;
            }

            if (vm.postFev1Meas > vm.preFev1Meas) {
                vm.diagnosis = measDiference(vm.preFev1Meas, vm.postFev1Meas);
            }
        });

        $ionicModal.fromTemplateUrl('check-mass.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal
        })  

        $scope.openModal = function() {
            $scope.modal.show()
        }

        $scope.closeModal = function() {
            $scope.modal.hide();
        };

        $scope.$on('$destroy', function() {
            $scope.modal.remove();
        });
        function diagnosisCalculator(postChange) {
            if (postChange < 1) {
                return 'Undertermined';
            } else if (postChange >= 1 && postChange <= 10) {
                return 'COPD';
            } else if(postChange >= 12) {
                return 'Asthma';
            } else if(postChange > 10 && postChange < 12){
                return 'Check';
            } else {
                return 'Undetermined';
            }
        }

        function measDiference(pre, post) {
            var diff = Math.abs((pre - post));
            console.log(diff);
            if (diff >= 0.200) {
                return 'Asthma';
            } else {
                return 'COPD';
            }
            return 'Undertermined';
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

    }
