

exports.install = function (Vue, options) {
  Vue.prototype.ajax = function (){
    alert('aaaaaaa');
  };
};
