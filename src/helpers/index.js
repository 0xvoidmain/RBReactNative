export var facebookAvatarUrl = function(id, type) {
  return `https://graph.facebook.com/${id}/picture?type=${type || 'normal'}`;
}