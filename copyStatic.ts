import * as shell from 'shelljs';
// 拷贝public文件夹到dist目录下
shell.cp('-R', 'public', 'dist');
shell.cp('-R', 'views', 'dist');