$(document).ready(() => {
    $('.delete-recipe').on('click', (e) => {
        $target = $(e.target);
        const id = $target.attr('data-id');
        $.ajax({
            type:'DELETE',
            url:'/recipe/'+id,
            success: (response) => {
                alert('Deleting Recipe');
                window.location.href='/';
            },
            error: (err) => {
                console.log(err);
            }
        });
 });
});