/******************************************

思路：
    同时遍历两个有序链表,将值相等的打印出来

******************************************/
function printCommonPart(head1,head2){
    while(head1!=null&&head2!=null){
        if(head1.val<head2.val){
            head1 = head1.next;
        }else if(head1.val>head2.val){
            head2 = head2.next;
        }else{
            console.log(head1.val)
            head1 = head1.next;
            head2 = head2.next;
        }
    }
}