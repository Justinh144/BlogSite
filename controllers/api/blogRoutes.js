const router = require('express').Router();
const { Blog } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const blogPosts = await Blog.findAll();
    res.status(200).json(blogPosts);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const blogPost = await Blog.findByPk(req.params.id);
    if (!blogPost) {
      res.status(404).json({ message: 'No blog post found with this id!' });
      return;
    }
    res.status(200).json(blogPost);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const newBlogPost = await Blog.create({
      ...req.body,
      // Assuming user_id comes from session: req.session.user_id,
    });
    res.status(201).json(newBlogPost);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const [affectedRows] = await Blog.update(req.body, {
      where: { id: req.params.id },
    });

    if (affectedRows > 0) {
      res.status(200).json({ message: 'Blog post updated successfully.' });
    } else {
      res.status(404).json({ message: 'No blog post found with this id!' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedBlogPost = await Blog.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (deletedBlogPost) {
      res.status(200).json({ message: 'Blog post deleted successfully.' });
    } else {
      res.status(404).json({ message: 'No blog post found with this id!' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;