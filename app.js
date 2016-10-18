'use strict';

angular.module('app', [])
    .controller('MainCtrl', MainController);

function MainController($scope) {
    $scope.mainList = [{
        label: "To Do List",list:[{task:"Second",
                    detail:"second detail",
                    time:Date.now(),
                    value:"",
                    status:false,
                }
        ]},
        {label:"Grocery",list:[{
                    task:"First",
                    detail:"first detail",
                    time:Date.now(),
                    value:"",
                    status:true,
                            },
        ]},
        {label:"HomeWork",list:[{
                    task:"Homewwork",
                    detail:"homewwork detail",
                    time:Date.now(),
                    value:"",
                    status:true,
                            },]
        }];
    $scope.pageView = "detail.html";
    $scope.newItem ={};
    $scope.selectedLabel = $scope.mainList[0];
    $scope.rowLimit = $scope.selectedLabel.list.length;
    $scope.sortList = "task"; 
    $scope.setSelectItem = function(item){
        $scope.selectedItem=item;
        $scope.index = $scope.selectedLabel.list.indexOf($scope.selectedItem);
    };
    $scope.editMode=false;
    $scope.mode = function(action){
        switch (action){
            case 0:
                $scope.addMode=true;
                $scope.editMode=false;
                break;
            case 1:
                $scope.addMode=false;
                $scope.editMode=true;
                break;
        }
    };

    $scope.addList = function(item) {
        $scope.selectedItem = $scope.newItem;
        $scope.selectedItem.time=Date.now();
        $scope.mode(0);
    };

    $scope.saveList=function(action){
        action == 2 ? $scope.selectedLabel.list.splice($scope.index,1)
                    : $scope.selectedItem.task!= null
                    ? $scope.selectedLabel.list.push($scope.selectedItem)
                    : alert('Nothing to save')
        $scope.newItem={};
        $scope.rowLimit = $scope.selectedLabel.list.length;
        $scope.addMode=false;
        $scope.editMode=false;
    };

    $scope.selectedLabel = $scope.mainList[0];
    $scope.setSelectLabel = function(element){
        $scope.selectedLabel=element;
        $scope.indexLabel = $scope.mainList.indexOf($scope.selectedLabel);
    };
    $scope.newLabel = {};
    $scope.addLabel = function(label){
        $scope.selectedLabel = $scope.newLabel;
        $scope.selectedLabel.list = [];
        $scope.add = true;
    };
    $scope.saveLabel= function(){
        $scope.selectedLabel.label != null ? 
        $scope.mainList.push($scope.selectedLabel):
        alert("Label not created");

        $scope.newLabel={};
        $scope.add = false;
    };
    $scope.deleteLabel=function(){
        $scope.mainList.splice($scope.indexLabel, 1)
    }
    $scope.diffDays=function(item){
        var classname = ((item.value - Date.now()) / (1000 * 60 * 60 * 24)) < 1 ? "list-group-item-danger" :
          ((item.value - item.time) / (1000 * 60 * 60 * 24)) <= 2 ? "list-group-item-warning":"";
        return classname;
    }
    $scope.page = 0;
    $scope.pageNo = function(action){
        var maxPage = ($scope.selectedLabel.list.length/ $scope.rowLimit);
        console.log('list length',$scope.selectedLabel.list.length)
        console.log('scope page', $scope.page);
        console.log('max page', maxPage);
        
        switch (action){
        case 0:
            if(($scope.page+1)<maxPage){
                $scope.page++
            }
            else{
                alert("Stop ...")
                // $scope.page--;
            }
            break;
        case 1:
            if(($scope.page-1)>=0){
                $scope.page--
            }
            else{
                alert("Stop ...")
                // $scope.page++;
            }
            break;
        }
        console.log($scope.page)
    }

    $scope.itemsPaginated = function () {
        $scope.currentPageIndex = $scope.page * $scope.rowLimit;
        console.log('currentPageIndex', $scope.currentPageIndex)
        console.log('page', $scope.page)
        console.log('rowLimit', $scope.rowLimit)

        return $scope.selectedLabel.list.slice(
            $scope.currentPageIndex, 
            $scope.currentPageIndex + $scope.rowLimit);
    };

};