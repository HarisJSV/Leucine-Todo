import express from 'express';
import { CohereClientV2 } from 'cohere-ai';
import axios from 'axios';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
const cohere = new CohereClientV2({
    token: process.env.COHERE_API_KEY,
  });
const port=3000;
const app=express();
app.use(cors());
app.use(express.json());

app.get('/todos', async (req, res) => {
    const { data, error } = await supabase.from('todos').select('*');
    
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    
    res.status(200).json(data);
  });
  

  app.post('/todos', async (req, res) => {
    const { title } = req.body;
    
    const { data, error } = await supabase
      .from('todos')
      .insert([{ title,completed: false}])
      .single();
    
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    
    res.status(201).json(data);
  });
  

  app.delete('/todos/:id', async (req, res) => {
    const { id } = req.params;
    console.log("Deleting todo with ID:", id);
    const { error } = await supabase
      .from('todos')
      .delete()
      .match({ id: id });
    
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    
    res.status(204).end();
  });
app.listen(port,()=>{
    console.log(`Server running on port ${port}`)
})

const SLACK_WEBHOOK_URL=process.env.SLACK_WEBHOOK_URL;
app.post('/summarize', async (req, res) => {
    try {
      const { data, error } = await supabase.from('todos').select('*').eq('completed', false);
      const todoText = data.map((todo, i) => `${i + 1}. ${todo.title}`).join('\n');
      const prompt = `Summarize the following pending to-do list:\n\n${todoText}. Empasize that this is pending to do list.`;
  
      const response = await cohere.chat({
        model: 'command-r-plus',
        messages: [{ role: 'user', content: prompt }],
      });
  
      const summary = response.message.content[0].text;
      console.log(response)
      console.log(summary)
      await axios.post(SLACK_WEBHOOK_URL, {
        text: `*To-Do Summary:*\n${summary}`,
      });
  
      res.status(200).json({ message: 'Summary sent to Slack!', summary });
  
    } catch (error) {
      console.error('Error during summarization or Slack post:', error.message);
      res.status(500).json({ error: 'Failed to summarize or send to Slack.' });
    }
  });

app.patch('/todos/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const { completed, title } = req.body;

  console.log(`PATCH /todos/${id} - completed: ${completed}, title: ${title}`);
  console.log('Incoming PATCH ID:', id, 'Type:', typeof id);

 
  const updateObj = {};
  if (completed !== undefined) updateObj.completed = completed;
  if (title !== undefined) updateObj.title = title;

  if (Object.keys(updateObj).length === 0) {
    return res.status(400).json({ error: "No fields to update provided." });
  }
  const { data, error } = await supabase
    .from('todos')
    .update(updateObj)
    .eq('id', id)
    .select(); 
    console.log("Hardcoded patch result:", data, error);
  if (error) {
    console.error('Supabase error:', error.message);
    return res.status(500).json({ error: error.message });
  }

  if (!data || data.length === 0) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  res.status(200).json(data[0]);
});
  


