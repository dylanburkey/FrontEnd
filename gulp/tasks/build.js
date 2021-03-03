module.exports = ({gulp}) => {
    
    const { task, parallel } = gulp;

    task('build', parallel('jekyll', 'css', 'js', 'fonts'));

};