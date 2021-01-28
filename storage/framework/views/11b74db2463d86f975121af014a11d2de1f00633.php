<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
	<meta http-equiv='Content-Type' content='text/html; charset=UTF-8' />
	
    <title>Laporan Keuangan <?php echo e($year); ?></title>
    
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
    <style>
        .pull-right {
            float: right;
        }
    </style>
</head>

<body>
    <div class="container" style="padding-left: 10px; padding-right: 10px">
        <h3 class="text-center mb-5 mt-5">Laporan Keuangan Tahun <?php echo e($year); ?></h3>
        <?php $__currentLoopData = $laporan; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $title => $value): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
            <h5 class="pull-right">IDR</h5>
            <h5><?php echo e($title); ?></h5>
            <table class="table table-borderless">
                <tbody>
                    <?php $__currentLoopData = $value; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $title1 => $value2): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                            <?php if(is_array($value2)): ?>
                                <tr>
                                    <th colspan="3"><?php echo e($title1); ?></th>
                                </tr>
                                <?php $__currentLoopData = $value2; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $title2 => $value3): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                                    <tr>
                                        <td width="8%"></td>
                                        <td><?php echo e($title2); ?></td>
                                        <td width="25%"><span class="pull-right"><?php echo e(number_format($value3,0,',','.')); ?></span></td>
                                    </tr>
                                <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                            <?php else: ?>
                                <tr>
                                    <th colspan="2"><?php echo e($title1); ?></th>
                                    <td><span class="pull-right"><?php echo e(number_format($value2,0,',','.')); ?></span></td>
                                </tr>
                            <?php endif; ?>
                    <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                </tbody>
            </table>
            
        <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
    </div>
	
</body>

</html><?php /**PATH /Applications/AMPPS/www/farah_accounting/resources/views/laporan-pdf.blade.php ENDPATH**/ ?>