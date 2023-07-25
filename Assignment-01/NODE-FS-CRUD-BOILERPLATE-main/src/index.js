const fs = require('fs/promises')


const myFileWriter = async (fileName, fileContent) => {
	await fs.writeFile(fileName,fileContent,(err)=>{
		if(err)throw err;
		console.log("file is created");
	});
}

const myFileReader = async (fileName) => {
	await fs.readFile(fileName,(err,data)=>{
		if(err) throw err;
		console.log(data);
	})
}


const myFileUpdater = async (fileName, fileContent) => {
	await fs.appendFile(fileName,fileContent,(err)=>{
		if(err)throw err;
		console.log(fileContent);
	})
}

const myFileDeleter = async (fileName) => {
	await fs.unlink(fileName,err=>{
		if(err)throw err;
		console.log(`${fileName} is deleted successfully`)
	})
}

myFileWriter('message.txt',"creating a txt file");
myFileReader('message.txt');
myFileUpdater('message.txt',"  updating the file content");
myFileDeleter('message.txt');

module.exports = { myFileWriter, myFileUpdater, myFileReader, myFileDeleter }